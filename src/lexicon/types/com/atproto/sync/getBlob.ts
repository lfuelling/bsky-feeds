/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import stream from 'stream';
import { HandlerAuth } from '@atproto/xrpc-server';

export interface QueryParams {
  /** The DID of the repo. */
  did: string;
  /** The CID of the blob to fetch */
  cid: string;
}

export type InputSchema = undefined
export type HandlerInput = undefined

export interface HandlerSuccess {
  encoding: '*/*';
  body: Uint8Array | stream.Readable;
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
