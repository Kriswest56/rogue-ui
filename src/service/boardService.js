import axios from 'axios'
const config = require("../config.json");
const baseUrl = config.roguelikeServer.baseUrl;
const errorMsg = ["Error................"];

/**
 * Retrieves board state for player
 * 
 * @param {name of player} username 
 */
export const requestData = async (username) => {
    /* istanbul ignore next */
    return await axios.get(`${baseUrl}/game/${username}/`)
        .then(function (response) {
            if (response.data && response.data.board) {
                console.log(response.data.board);
                return response.data;
            }
            return errorMsg;
        })
        .catch(function (error) {
            console.log(error);
            return errorMsg;
        });
};

/**
 * Retrieves board state for player
 * 
 * @param {name of player} username 
 */
export const requestBoard = async (username) => {
    /* istanbul ignore next */
    return await axios.get(`${baseUrl}/game/${username}/`)
        .then(function (response) {
            if (response.data && response.data.board) {
                return response.data;
            }
            return errorMsg;
        })
        .catch(function (error) {
            console.log(error);
            return errorMsg;
        });
};

/**
 * Sends a movement action to the server to be queued
 * 
 * @param {name of player} username 
 * @param {direction of movement} direction 
 */
export const performAction = async (username, direction) => {
    /* istanbul ignore next */
    await axios.get(`${baseUrl}/game/${username}/${direction}`)
        .then(function (response) {
            if (response.data && response.data.board) {
                return response.data.board.split("\n");
            }
            return errorMsg;
        })
        .catch (function (error) {
            console.log(error);
            return errorMsg;
        });
}