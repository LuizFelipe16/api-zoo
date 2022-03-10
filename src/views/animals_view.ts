import Animal from '../models/Animal';
import imagesView from './images_view';

export default {
  render(animal: Animal) {
    return {
      id: animal.id,
      name: animal.name,
      nickname: animal.nickname,
      about: animal.about,
      nationality: animal.nationality,
      age: animal.age,
      savage: animal.savage,
      images: imagesView.renderMany(animal.images)
    }
  },

  renderMany(animals: Animal[]) {
    return animals.map(animal => this.render(animal));
  }
}