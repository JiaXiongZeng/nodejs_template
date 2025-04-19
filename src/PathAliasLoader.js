import { resolve as resolveTs } from 'ts-node/esm'
import * as tsConfigPaths from 'tsconfig-paths'
import { pathToFileURL } from 'url'

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve (specifier, ctx, defaultResolve) {
  const match = matchPath(specifier);

  if(match) {
    return resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve);
  }
  
  if (specifier.endsWith(".js")){
    const lastExtIdx = specifier.lastIndexOf(".js");
    const newSpecifier = specifier.substring(0, lastExtIdx) + ".ts";
    const newMatch = matchPath(newSpecifier);
    if(newMatch){
      return resolveTs(pathToFileURL(`${newMatch}`).href, ctx, defaultResolve);
    }
  }

  return resolveTs(specifier, ctx, defaultResolve);
}

export { load, transformSource } from 'ts-node/esm'