const { matchedData } = require('express-validator');
const sessionService = require('../services/session.service');

function toJson(session) {
  return {
    session_id: session.session_id,
    code: session.join_pin,
    status: session.status,
    set_id: session.set_id,
    host_id: session.host_id,
    created_at: session.created_at,
  };
}

async function create(req, res) {
  const { set_id } = matchedData(req, { locations: ['body'] });
  const session = await sessionService.create(set_id, req.user);
  res.status(201).json(toJson(session));
}

async function get(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const session = await sessionService.get(code);
  res.status(200).json(toJson(session));
}

async function changeStatus(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const { status } = matchedData(req, { locations: ['body'] });
  const session = await sessionService.changeStatus(code, status, req.user);
  res.status(200).json(toJson(session));
}

module.exports = { create, get, changeStatus };