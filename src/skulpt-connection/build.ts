import { IProjectContent } from "../model/project";

declare var Sk: any;

const builtinRead = (fileName: string) => {
  if (
    Sk.builtinFiles === undefined ||
    Sk.builtinFiles["files"][fileName] === undefined
  ) {
    throw Error(`File not found: '${fileName}'`);
  }

  return Sk.builtinFiles["files"][fileName];
};

export enum BuildOutcomeKind {
  Success,
  Failure,
}

interface BuildSuccess {
  kind: BuildOutcomeKind.Success;
  compiledMod: any,
}

interface BuildFailure {
  kind: BuildOutcomeKind.Failure;
  error: any; // TODO: Can we do better here?
}

export type BuildOutcome = BuildSuccess | BuildFailure;

export const build = async (
  project: IProjectContent,
  addOutputChunk: (chunk: string) => void,
  handleError: (pytchError: any, errorContext: any) => void
): Promise<BuildOutcome> => {
  // This also resets the current_livrendering Stagee_project slot.
  Sk.configure({
    __future__: Sk.python3,
    read: builtinRead,
    output: addOutputChunk,
    pytch: { on_exception: handleError },
  });
  try {
    // ensureSoundManager();
    // Sk.pytch.async_load_image = (name: string) => {
    //   return assetServer.loadImage(name);
    // };
    var mod = await Sk.misceval.asyncToPromise(
      () => Sk.importMainWithBody("<stdin>", false, project.codeText, true)); 
    
    return { kind: BuildOutcomeKind.Success, compiledMod: mod };
  } catch (err) {
    return { kind: BuildOutcomeKind.Failure, error: err };
  }
};
