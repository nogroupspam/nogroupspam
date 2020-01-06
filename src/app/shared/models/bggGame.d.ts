
/**
 * Used to store a list of games grouped by the same type.
 * 
 * @param {string} type - the type of all games in the list.
 * @param {BggGames[]} games - the list of games.
 */
export interface BggGamesclassifieds {
  type: string;
  games: BggGame[];
}

/**
 * Used to store the following information from a bgg game.
 *
 * NOTE: In the bgg not all games contains all the information.
 *  
 * @param {number} id - id number of the game.
 * @param {string} type - type of the game, known results boardgame or boardgameexpansion
 * @param {string} name - name of the game.
 * @param {string} nameType - type of the name, known results primary or alternate. If is primary it is the original name and if is alternate the name is in another language.
 * @param {string} image - url with an image of the game
 * @param {string} thumbnail - url with a thumbnail of the game
 * @param {string} yearpublished - year when the game was published
 */
export interface BggGame {
  id: number;
  type: string;
  name: string;
  nameType: string;
  image: string;
  thumbnail: string;
  yearpublished: string;
}

/**
 * Used to store the game type, the image and the humbnail of a game
 *
 * @param {string} type - type of the game, known results boardgame or boardgameexpansion
 * @param {string} image - url
 * @param {string} thumbnail - url
 */
export interface ImagesAndTypeFix {
  image: string;
  thumbnail: string;
  type: string;
}