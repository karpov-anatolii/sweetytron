import { makeAutoObservable } from "mobx";

export default class InfoStore {
  //Глобальное хранилище. Из любого места можно получить его данные, т.к.он записан в  context, и получить значения можно через хук  useContext()
  constructor() {
    this._siteName = "";
    this._logo = "";
    this._articles = [];
    makeAutoObservable(this);
  }

  setSiteName(name) {
    this._siteName = name;
  }

  setLogo(logo) {
    this._logo = logo;
  }

  setArticles(articles) {
    this._articles = articles;
  }

  get siteName() {
    return this._siteName;
  }

  get logo() {
    return this._logo;
  }

  get articles() {
    return this._articles;
  }
}
