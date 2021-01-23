import axios from '../../../node_modules/axios/index';

export default class userService {
  static async getUser(id) {
    const response = await axios.get(`/users?id=${id}`);
    return response.data;
  }
}
