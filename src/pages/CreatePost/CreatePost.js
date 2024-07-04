import React, { useState, useEffect } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./CreatePost.module.css";

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

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");
  const [reservedTimes, setReservedTimes] = useState([]);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument("posts");
  const { documents: existingAppointments } = useFetchDocuments("posts");

  useEffect(() => {
    if (existingAppointments) {
      const reserved = existingAppointments.map((appointment) => ({
        date: appointment.date,
        time: appointment.time,
      }));
      setReservedTimes(reserved);
    }
  }, [existingAppointments]);

  const employees = [
    "Alfredo Soares",
    "Diego Terra",
    "Ana Beatriz",
    "David Silva",
    "Olivia Souza",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validar o restante dos campos
    if (!title || !selectedEmployee || !date || !time || !body || !tags) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    // Verificar se o horário já está reservado para o mesmo dia
    const isTimeReserved = reservedTimes.some(
      (rt) => rt.date === date && rt.time === time
    );

    if (isTimeReserved) {
      setFormError("Este horário já está reservado. Por favor, escolha outro horário.");
      return;
    }

    // Inserir o documento no banco de dados
    insertDocument({
      title,
      image: washImages[title], // Obter a imagem conforme o tipo de lavagem selecionado
      date,
      time,
      body,
      tags: tags.split(",").map(tag => tag.trim().toLowerCase()),
      uid: user.uid,
      createdBy: user.displayName,
      selectedEmployee, // Adicionar o funcionário selecionado ao documento
    });

    // Navegar para a página inicial após o agendamento
    navigate("/");
  };

  const getAvailableTimes = (selectedDate) => {
    const times = Array.from({ length: 12 }, (_, i) => i + 8);
    return times.filter((hour) => {
      const formattedTime = `${hour}:00`;
      return !reservedTimes.some((rt) => rt.date === selectedDate && rt.time === formattedTime);
    });
  };

  return (
    <div className={styles.create_post}>
      <h2>Washed Car</h2>
      <p>Detalhe como você deseja a limpeza do seu carro!</p>
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
            id="washeType"
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

        {title && (
          <div>
            <img src={washImages[title]} alt={title} style={{ width: "100%", height: "auto" }} />
          </div>
        )}

        <label>
          <span>Selecione um Funcionário</span>
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

        {/* Input Data da Lavagem */}
        <label>
          <span>Data da Lavagem</span>
          <input
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
            value={date}
            min={new Date().toISOString().split("T")[0]}
          />
        </label>

        {/* Input Horário da Lavagem e disponibilidade */}
        <label>
          <span>Horário da Lavagem</span>
          <select
            style={{
              width: "100%",
              height: "30px",
              padding: "4px",
              fontSize: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Selecione um horário</option>
            {date && getAvailableTimes(date).map((hour) => (
              <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Alguma Observação?</span>
          <textarea
            name="body"
            required
            placeholder="Insira alguma observação sobre a lavagem"
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

        {!response.loading && <button className="btn">Agendar!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
