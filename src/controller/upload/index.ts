import { RequestHandler } from "express";
import formidable from 'formidable';

const uploadHandler: RequestHandler = async (req, res, next) => {
  const form = formidable({ multiples: true });
}