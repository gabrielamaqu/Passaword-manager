interface FormProps {
  onCancel: () => void;
}
function Form({ onCancel }: FormProps) {
  return (
    <form>
      <label htmlFor="nome"> Nome do serviço </label>
      <input id="nome" type="text" name="nome" />

      <label htmlFor="login"> Login </label>
      <input id="login" type="text" name="login" />

      <label htmlFor="password"> Senha </label>
      <input id="password" type="password" name="password" />

      <label htmlFor="url"> URL </label>
      <input id="url" type="text" name="url" />

      <button data-testid="cadastrar-button" type="submit">
        Cadastrar
      </button>
      <button data-testid="cancelar-button" type="button" onClick={ onCancel }>
        Cancelar
      </button>
    </form>
  );
}
export default Form;
