/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { HandlerAuth } from '@atproto/xrpc-server';

export interface QueryParams {
}

export interface InputSchema {
  useCount: number;
  forAccount?: string;

  [k: string]: unknown;
}

export interface OutputSchema {
  code: string;

  [k: string]: unknown;
}

export interface HandlerInput {
  encoding: 'application/json';
  body: InputSchema;
}

export interface HandlerSuccess {
  encoding: 'application/json';
  body: OutputSchema;
  headers?: { [key: string]: string };
}

export interface HandlerError {
  status: number;
  message?: string;
}

export type HandlerOutput = HandlerError | HandlerSuccess
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
  auth: HA
  params: QueryParams
  input: HandlerInput
  req: express.Request
  res: express.Response
}
export type Handler<HA extends HandlerAuth = never> = (
  ctx: HandlerReqCtx<HA>,
) => Promise<HandlerOutput> | HandlerOutput
