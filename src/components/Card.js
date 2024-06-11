export default class Card {
  //good to go 4.30, idk what the reviewer means about changing profile elements in here
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._id = data._id;
    this._isLiked = data._isLiked;
  }

  //check out like on this page 6.10
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLike(this); //something is wrong here
      });
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._id);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  /*new 40-44 
  setIsLiked(isLiked) {
    // set instance variable
    this._isLiked = isLiked;
    this._renderLikes();
  } put it down below in updateIsLiked method */

  /* reviwer said to remove 6.9.2024 */
  handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  } //fixed delete card!! renamed from deletebutton 5.31.2024

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector("#card-image");
    const cardTitleEl = this._cardElement.querySelector("#card-title");
    cardImageEl.src = this._data.link;
    cardImageEl.alt = this._data.name;
    cardTitleEl.textContent = this._data.name;
    this._setEventListeners();
    this._renderLike();

    return this._cardElement;
  }

  _renderLike() {
    if (this._isLiked) {
      this._cardElement.classList.add(".card__like-button_active");
    } else {
      this._cardElement.classList.remove(".card__like-button_active");
    }
  }

  //what is needed with this method below?
  updateIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLike();
  }
}
//6.10 fix the like button, need to tell the server it's true

//something isn't right w/ the like/trash icons, but we need to see the cards first lol
//where are the initial cards called from? components, let's check it out
