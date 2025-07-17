function SimpsonsAlert({ title, description, children, errores }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="simpsons-alert"
    >
      <h5 id="modal-title">{title}</h5>
      <p id="modal-desc">{description}</p>
      {children}
      <input
        id="email"
        name="email"
        className="form-control"
        aria-label="Correo electrónico"
        aria-describedby="emailHelp"
        placeholder="Correo electrónico"
      />
      <small id="emailHelp" className="form-text text-muted">
        Nunca compartiremos tu correo con nadie más.
      </small>
      {errores.title && (
        <span role="alert" aria-live="assertive" style={{ color: 'red' }}>
          {errores.title}
        </span>
      )}
    </div>
  );
}

export default SimpsonsAlert;