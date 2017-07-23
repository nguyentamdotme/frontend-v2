import backend from '../config/backend.config';
import io from 'socket.io-client';

const socket = io.connect(backend.url);

module.exports = socket;
