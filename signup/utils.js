let methdos={};

methdos.getBodyData= (event) => {
  const data = event.body;
  if (data) return JSON.parse(data)
  else return null;
};


methdos.getPrincipals=  (event) => {
    const fetch = (obj) => obj.requestContext.authorizer.principalId;
    const principals = getDeep(fetch, event);
    if (!principals) {
     return false;
    }
    return JSON.parse(principals);
  };




module.exports=methdos;

function getDeep(fn, obj) {
    let value;
    try {
      value = fn(obj);
    } catch (e) {
      //console.log(e);
      value = false;
    } finally {
      return value
    }
  }
