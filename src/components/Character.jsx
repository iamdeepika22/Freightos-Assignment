const Character = ({ character }) => {
  return (
    <div className="card">
      <img
        src={character.image}
        alt={character.name}
        loading="lazy"
        decoding="async"
      />
      <div className="card-body">
        <h3>{character.name}</h3>
        <span
          className={`status ${
            character.status === "Alive" ? "alive" : "dead"
          }`}
        >
          {character.status}
        </span>
      </div>
    </div>
  );
};

export default Character;