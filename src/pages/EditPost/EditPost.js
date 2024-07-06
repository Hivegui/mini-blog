import styles from "./EditPost.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

// Importar imagens
import Completa from "../../images/img-completa.jpg";
import Interna from "../../images/img-interna.jpg";
import Seco from "../../images/img-seco.jpg";
import Polimento from "../../images/img-polimento.jpg";

// Mapeamento de tipos de lavagem para as imagens importadas
const washImages = {
  "Completa": Completa,
  "Limpeza Interna": Interna,
  "Lavagem a Seco": Seco,
  "Polimento": Polimento,
};

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reservedTimes, setReservedTimes] = useState([]);
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // Array dos Funcionários
  const employees = [
    "Alfredo Soares",
    "Diego Terra",
    "Ana Beatriz",
    "David Silva",
    "Olivia Souza",
  ];

  // Preencher dados do formulário quando o post estiver carregado
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setDate(post.date);
      setTime(post.time);
      setSelectedEmployee(post.selectedEmployee);
      const textTags = post.tags.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const data = {
      title,
      selectedEmployee,
      image: washImages[title], // Definir imagem com base no tipo de lavagem
      body,
      date,
      time,
      tags: tagsArray,
    };

    updateDocument(id, data);
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando lavagem: {post.title}</h2>
          <p>Altere os dados conforme necessário</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Tipo de Lavagem:</span>
              <select
                style={{
                  width: "100%",
                  height: "30px",
                  padding: "4px",
                  fontSize: "15px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                id="typeOfWashSelect"
                className={styles.select}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="">Selecione o tipo de lavagem</option>
                <option value="Completa">Completa</option>
                <option value="Limpeza Interna">Limpeza Interna</option>
                <option value="Lavagem a Seco">Lavagem a Seco</option>
                <option value="Polimento">Polimento</option>
              </select>
            </label>

            <p className={styles.preview_title}>Preview da imagem:</p>
            <img
              className={styles.image_preview}
              src={washImages[title]}
              alt={title}
            />

            <label>
              <span>Selecione um Funcionário:</span>
              <select
                style={{
                  width: "100%",
                  height: "30px",
                  padding: "4px",
                  fontSize: "15px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Selecione um funcionário</option>
                {employees.map((employee, index) => (
                  <option key={index} value={employee}>
                    {employee}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Horário da Lavagem:</span>
              <input
                type="time"
                required
                onChange={(e) => setTime(e.target.value)}
                value={time}
                list="available-times"
              />
              <datalist id="available-times">
                {Array.from({ length: 9 }, (_, i) => i + 8).map((hour) => (
                  <>
                    <option
                      key={`${hour}:00`}
                      value={`${hour}:00`}
                      disabled={reservedTimes.some(
                        (rt) => rt.date === date && rt.time === `${hour}:00`
                      )}
                    >{`${hour}:00`}</option>
                    <option
                      key={`${hour}:30`}
                      value={`${hour}:30`}
                      disabled={reservedTimes.some(
                        (rt) => rt.date === date && rt.time === `${hour}:30`
                      )}
                    >{`${hour}:30`}</option>
                  </>
                ))}
              </datalist>
            </label>

            <label>
              <span>Data da Lavagem:</span>
              <input
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </label>

            <label>
              <span>Observação:</span>
              <textarea
                name="body"
                required
                placeholder="Insira uma observação"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && <button className="btn">Salvar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
