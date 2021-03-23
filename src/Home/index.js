import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

import {
  Container,
  Title,
  DateContainer,
  ButtonContainer,
  Button,
  DateChoosed,
  HoursCalculated,
} from "./styles";

function Home() {
  const [dataInicial, setDataInicial] = useState(0);
  const [dataFinal, setDataFinal] = useState(0);
  const [horaNormal, setHoraNormal] = useState(0); // 7h as 19h
  const [horaTotal, setHoraTotal] = useState("");
  const [horaNoturna, setHoraNoturna] = useState(""); // 19h01 as 06h59
  const [minutosNoturno, setMinutosNoturno] = useState(0);
  const [filled, setFilled] = useState(false);
  const [calcHoras, setCalcHoras] = useState(false);

  let horaDiurnaMinutos = 0;

  function handleSubmit() {
    if (dataInicial.length > 0 && dataFinal.length > 0) {
      const separarDataInicial = dataInicial.split("T");
      const separarHoraInicial = separarDataInicial[1].split(":");
      const separarDataFinal = dataFinal.split("T");
      const separarHoraFinal = separarDataFinal[1].split(":");

      if (separarDataFinal[0] > separarDataInicial[0]) {
        setHoraTotal(
          converterHora(
            1440 -
              +converterMinutos(separarDataInicial[1]) +
              +converterMinutos(separarDataFinal[1])
          )
        );

        if (separarHoraInicial[0] > 19 && separarHoraFinal[0] < 7) {
          setHoraNormal(0);
          setHoraNoturna(converterHora(converterMinutos(horaTotal)));
        }

        if (separarHoraInicial[0] > 19 && separarHoraFinal[0] > 7) {
          const horaDiurna =
            separarHoraInicial[0] - 19 < 0 ? 0 : separarHoraInicial[0] - 19;
          const minutosDiurno = horaDiurna === 0 ? 0 : separarHoraInicial[1];

          horaDiurnaMinutos = converterMinutos(
            `${horaDiurna}:${minutosDiurno}`
          );

          setHoraNormal(
            converterHora(
              (horaDiurnaMinutos =
                +horaDiurnaMinutos +
                (converterMinutos(separarDataFinal[1]) - 420))
            )
          );

          setHoraNoturna(
            converterHora(
              converterMinutos(horaTotal) - converterMinutos(horaNormal)
            )
          );
        }

        setFilled(true);
        setCalcHoras(true);
      } else {
        //Inicia em jornada Noturna e acaba em jornada noturna
        if (separarHoraInicial[0] < 7 && separarHoraFinal[0] >= 19) {
          const horasIniciais = (6 - separarHoraInicial[0]) * 60;
          const horasEmMinutosIniciais =
            60 - +separarHoraInicial[1] + horasIniciais;

          const horasFinais = separarHoraFinal[0] - 19;
          const horasEmMinutosFinais = +horasFinais * 60 + +separarHoraFinal[1];

          const horaNoturnaTotal =
            +horasEmMinutosIniciais + +horasEmMinutosFinais;

          setHoraNormal("12:00");
          setHoraNoturna(converterHora(horaNoturnaTotal));
        }

        //Inicia em jornada noturna e acaba em jornada diurna
        if (separarHoraInicial[0] < 7 && separarHoraFinal[0] < 19) {
          //Inicia em jornada noturna e acaba em jornada norturna antes das 7
          if (separarHoraInicial[0] >= 0 && separarHoraFinal[0] < 7) {
            setHoraNormal(0);
            setHoraNoturna(
              converterHora(
                converterMinutos(separarDataFinal[1]) -
                  converterMinutos(separarDataInicial[1])
              )
            );
          } else {
            const quantasHoras = 6 - separarHoraInicial[0];
            const horasEmMinutos = quantasHoras * 60;
            const minutos = 60 - +separarHoraInicial[1];

            const quantasHorasDiurnas = (separarHoraFinal[0] - 7) * 60;
            const minutosDiurno = +separarHoraInicial[1];

            if (quantasHoras === 0) {
              setMinutosNoturno(converterHora(+minutos));
            } else {
              setHoraNormal(converterHora(quantasHorasDiurnas + minutosDiurno));
              setHoraNoturna(converterHora(horasEmMinutos + minutos));
            }
          }
        }

        //Inicia em jornada diurna e acaba em jornada diurna
        if (separarHoraInicial[0] >= 7 && separarHoraFinal[0] >= 19) {
          const quantasHorasNoturna = separarHoraFinal[0] - 19;
          const horasEmMinutos =
            quantasHorasNoturna * 60 + +separarHoraFinal[1];

          if (quantasHorasNoturna === 0) {
            setMinutosNoturno(converterHora(separarHoraFinal[1]));
          }
          setHoraNoturna(converterHora(horasEmMinutos));

          setHoraNormal(
            converterHora(
              converterMinutos(horaTotal) - converterMinutos(horaNoturna)
            )
          );
        }

        setHoraTotal(
          converterHora(
            converterMinutos(separarDataFinal[1]) -
              converterMinutos(separarDataInicial[1])
          )
        );

        setFilled(true);
        setCalcHoras(true);
      }
    } else {
      alert("Preencha todos os dados");
    }
  }

  function handleReset() {
    setDataInicial(0);
    setDataFinal(0);
    setHoraNormal(0);
    setHoraTotal("");
    setHoraNoturna("");
    setFilled(false);
    setCalcHoras(false);
  }

  useEffect(() => {
    if (horaNoturna === "") {
      setHoraNormal(horaTotal);
    }
  }, [horaNoturna, horaTotal]);

  function converterHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60;
    const textoHoras = `00${horas}`.slice(-2);
    const textoMinutos = `00${min}`.slice(-2);

    return `${textoHoras}:${textoMinutos}`;
  }

  function converterMinutos(hora) {
    const horas = hora.split(":");
    const minutes = +horas[0] * 60 + +horas[1];

    return `${minutes}`;
  }

  return (
    <Container>
      <img src={logo} alt="Logo Beta" style={{ width: 350, height: 120 }} />

      <Title>Ponto</Title>

      <DateContainer>
        <label htmlFor="dataEntrada">Data e hora de entrada</label>
        <input
          type="datetime-local"
          id="dataEntrada"
          value={dataInicial}
          onChange={(e) => setDataInicial(e.target.value)}
          required
        />
      </DateContainer>

      <DateContainer>
        <label htmlFor="dataSaida" style={{ marginTop: 10 }}>
          Data e hora de saida
        </label>
        <input
          type="datetime-local"
          id="dataSaida"
          value={dataFinal}
          onChange={(e) => setDataFinal(e.target.value)}
          required
        />
      </DateContainer>

      <ButtonContainer>
        <Button onClick={handleSubmit}>Confirmar</Button>
        <Button
          onClick={handleReset}
          style={{ marginLeft: 10 }}
          disabled={!calcHoras}
        >
          Resetar
        </Button>
      </ButtonContainer>

      {filled && (
        <DateChoosed>
          <p>
            Data escolhida para entrada: {dataInicial.replace("T", " Horas: ")}
          </p>
          <p>Data escolhida para Saída: {dataFinal.replace("T", " Horas: ")}</p>
        </DateChoosed>
      )}

      {calcHoras && (
        <HoursCalculated>
          <p>Hora total: {horaTotal}</p>
          <p>Hora normal: {horaNormal} </p>
          <p>
            Hora Norturna:{" "}
            {horaNoturna < 60 ? `${minutosNoturno} minutos` : horaNoturna}
          </p>
        </HoursCalculated>
      )}
    </Container>
  );
}

export default Home;
