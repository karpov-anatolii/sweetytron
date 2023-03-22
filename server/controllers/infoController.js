const { Info } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs/promises");

class infoController {
  async create(req, res, next) {
    try {
      const { siteName } = req.body;
      let logoRow;
      const siteNameRow = await Info.findOne({
        where: { key: "siteName" },
      });
      if (siteNameRow) {
        await Info.update(
          {
            value: siteName,
          },
          { where: { key: "siteName" } }
        );
      } else {
        await Info.create({
          key: "siteName",
          value: siteName,
        });
      }

      if (req.files) {
        const { logo } = req.files;
        let tmpPathName = logo.tempFilePath;
        let logoName = uuid.v4() + ".png";
        let filePathName = path.resolve(
          __dirname,
          "../static/images",
          logoName
        );
        logo.mv(tmpPathName, async (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          const metadata = await sharp(tmpPathName).metadata();
          await sharp(tmpPathName)
            .resize({
              width: parseInt((200 * metadata.width) / metadata.height),
              height: 200,
            })
            .toFile(filePathName)
            .then(() => fs.unlink(tmpPathName).catch((er) => console.log(er)));
        });

        logoRow = await Info.findOne({
          where: { key: "logo" },
        });
        if (logoRow) {
          await Info.update({ value: logoName }, { where: { key: "logo" } });
          fs.unlink(
            path.resolve(__dirname, "..", "static/images", logoRow.value)
          ).catch((er) => console.log(er));
        } else {
          await Info.create({ key: "logo", value: logoName });
        }
      }

      return res.json(logoRow);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const info = await Info.findAll();
      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new infoController();
