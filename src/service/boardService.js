import axios from 'axios'
const config = require("../config.json");
const baseUrl = config.roguelikeServer.baseUrl;

export const requestBoard = async (username) => {

    /* istanbul ignore next */
    let board = await axios.get(`${baseUrl}/game/${username}/`)
        .then(function (response) {
            return response.data.board.split("\n");
        })
        .catch(function (error) {
            console.log(error);
            return ["Error"];
        });

    return board;
};

/* istanbul ignore next */
export const performAction = async (username, direction) => {
    /* istanbul ignore next */
    await axios.get(`${baseUrl}/game/${username}/${direction}`)
        .then(function (response) {
            if (response.data && response.data.board) {
                return response.data.board.split("\n");
            }
            return ["Error"];
        })
        .catch (function (error) {
            console.log(error);
            return ["Error"];
        });
}