const ConfigGroup = () => {

  return(
    <div style={{minHeight: '400px'}}>
      <h3>Editar grupo</h3>
      <br />
      <div className="form">
        <form>
          <input className="outlined full" type="text" placeholder="Nome do grupo" />
        </form>
      </div>
    </div>
  );
};

export {ConfigGroup};