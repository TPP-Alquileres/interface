const  Context = ()=>{}

export default Context

interface RenderErrorParams { 
  res: any;
  status: number;
  message: string;
}

interface RenderFormErrorParams { 
  res: any;
  err: any;
}

export function renderError( { res, status, message }: RenderErrorParams ) {
  res.status(status).json( { error: message } );
}

export function renderFormErrorIfNecessary( { res, err }: RenderFormErrorParams ) {
  if (err) {
    renderError( { res, status: 500, message: "Form could not be processed" } );
  }
}