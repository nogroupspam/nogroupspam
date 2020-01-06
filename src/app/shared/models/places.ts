const iconsLogosPath = 'assets/logos/';
const iconsPlacesPath = iconsLogosPath + 'places/';

export class Places {
  static readonly homoludicusValencia: Place = {
    name: 'Homoludicus Valencia',
    image: iconsPlacesPath + 'homoludicusValencia.png',
    thumbnail: iconsPlacesPath + 'homoludicusValencia-thumbnail.png',
    address: 'Calle del Doctor Sanchis Sivera, 21, 46008 Valencia'
  };
  static readonly zacatrusValencia: Place = {
    name: 'Zacatrus!',
    image: iconsPlacesPath + 'zacatrus.svg',
    thumbnail: iconsPlacesPath + 'zacatrus.svg',
    address: 'Avenida del Reino de Valencia, 66, 46005 Valencia'
  };
  static readonly bruixesIFades: Place = {
    name: 'Bruixes i Fades',
    image: iconsPlacesPath + 'bruixesIFades.jpg',
    thumbnail: iconsPlacesPath + 'bruixesIFades-thumbnail.jpg',
    address: 'Calle de Rubén Darío, 18, 46021 Valencia'
  };
  static readonly goblinTraderValencia: Place = {
    name: 'GoblinTrader Valencia',
    image: iconsPlacesPath + 'goblinTraderValencia.png',
    thumbnail: iconsPlacesPath + 'goblinTraderValencia-thumbnail.png',
    address: 'Calle del Conde de Altea, 4, 46005 Valencia'
  };
  static readonly gremioDeDragones: Place = {
    name: 'Gremio De Dragones',
    image: iconsPlacesPath + 'gremioDeDragones.png',
    thumbnail: iconsPlacesPath + 'gremioDeDragones-thumbnail.png',
    address: 'Avenida del Dr. Peset Aleixandre, 91, 46009 Valencia'
  };
  static readonly CartooncorpEvolution: Place = {
    name: 'CartoonCorp Evolution',
    image: iconsPlacesPath + 'cartoonCorpEvolution.png',
    thumbnail: iconsPlacesPath + 'cartoonCorpEvolution-thumbnail.png',
    address: 'Calle de Guillem de Castro 53 Bj Iqz., 46007 Valencia'
  };
  static readonly vitruvianGames: Place = {
    name: 'Vitruvian Games',
    image: iconsPlacesPath + 'vitruvianGames.jpg',
    thumbnail: iconsPlacesPath + 'vitruvianGames-thumbnail.jpg',
    address: 'Calle de Segorbe, 9, 46004 Valencia'
  };
  static readonly clubDreadnought: Place = {
    name: 'Club Dreadnought',
    image: iconsPlacesPath + 'clubDreadnought.png',
    thumbnail: iconsPlacesPath + 'clubDreadnought.png',
    address: 'Calle Olimpia Arozena Torres, 42, 46018 Valencia'
  };
  static readonly generacionX: Place = {
    name: 'Generacion X',
    image: iconsPlacesPath + 'generacionx.svg',
    thumbnail: iconsPlacesPath + 'generacionx.svg',
    address: 'Calle Villa de Muro, 5, 46020 Valencia'
  };
  static readonly gamesWorkShop: Place = {
    name: 'Games Workshop',
    image: iconsPlacesPath + 'gamesWorkshop.svg',
    thumbnail: iconsPlacesPath + 'gamesWorkshop.svg',
    address: 'Calle Huesca, 4, 46001 Valencia'
  };
  static readonly elClan: Place = {
    name: 'El Clan',
    image: iconsPlacesPath + 'elClan.png',
    thumbnail: iconsPlacesPath + 'elClan-thumbnail.png',
    address: 'Calle Juan Llorens, 40, 46001 Valencia'
  };
  static readonly unaCosaRara: Place = {
    name: 'una Cosa Rara',
    image: iconsPlacesPath + 'unaCosaRara.svg',
    thumbnail: iconsPlacesPath + 'unaCosaRara.svg',
    address: 'Calle Villanueva y Gascons, 2, 46001 Valencia'
  };

  public static getAllPlaces(): Place[] {
    return [
      Places.homoludicusValencia,
      Places.zacatrusValencia,
      Places.bruixesIFades,
      Places.goblinTraderValencia,
      Places.gremioDeDragones,
      Places.CartooncorpEvolution,
      Places.vitruvianGames,
      Places.clubDreadnought,
      Places.generacionX,
      Places.gamesWorkShop,
      Places.elClan,
      Places.unaCosaRara
    ];
  }
}

export interface Place {
  readonly name: string;
  readonly image: string;
  readonly thumbnail: string;
  readonly address: string;
}
