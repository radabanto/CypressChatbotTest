import { faker } from '@faker-js/faker'; 
import { times } from "lodash" ;

/**
 * A utility method for creating a fake user
 *  * + Outputs a json object that can be referred to by spec tests
 *  * + Data is generated randomly based on faker v6
 * TODO: Upgrade to a later version of faker
 * @returns an json object containing pertinent fake test user information
 * @method createFakeUser
 */
const createFakeUser = () => ({
    name:`${faker.name.findName()}`,
    email:`${"example+" + faker.random.number() + "@gmail.com"}`,
    phone:`${faker.phone.phoneNumber('+614########').slice(3).replace(' ', '')}`,
    suburb:`${faker.address.county()}`,
    freeText1: `${faker.lorem.words(200)}`,
    freeText2: `${faker.lorem.words(60)}`,
    freeText3: `${faker.lorem.words(150)}`,
    freeTextNG: `${faker.lorem.words(30)}`,
    rating: `${faker.random.number({ min: 1, max: 10, precision: 1})}`,
  });
  
  /**
   * Export function to create a factory fixture for test data management
   * of users by writing onto a json object
   * @param {number} numberOfUsers - indicate desired number of users 
   * @returns a json array of users
   * @method createUserData
   */
  export const createUserData = (numberOfUsers) =>
    times(numberOfUsers, () => createFakeUser())
  
  /**
   * Export function to create a factory fixture for test data management
   * of users by writing onto a json file
   * @param {number} numberOfUsers - indicate desired number of users
   * @method saveUserData
   */  
  export const saveUserData = (numberOfUsers) => {
    const userData = createUserData(numberOfUsers)
    fs.writeFile(path.join(process.cwd(), "userData.json"), userData)
  }