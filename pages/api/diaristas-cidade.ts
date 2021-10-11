import { UserShortInterface } from "../../types/UserInterface";

import axios from "axios";

const url = "https://random-data-api.com/api/";

export const ApiService = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

interface UserDescriptionAllApi {
  first_name: string;
  last_name: string;
  address: {
    city: string;
  };
}

function getRandom(a = 0, b = 1): number {
  return Math.ceil((b - a) * Math.random() + a);
}

const CEPS = ["65930000", "00000000"];

function diaristasCidade(req: any, res: any) {
  //   var diaristas = await getRandom.users(3);
  var { cep } = req.query;

  var cep_existe = false;
  CEPS.map((item) => {
    if (cep == item) {
      cep_existe = true;
    }
  });
  if (!cep_existe) {
    res.status(404).json({ error: "CEP não encontrado" });
  }
  var number: Number = Math.ceil(Math.random() * 10);
  const url = "users/random_user?size=" + number;
  ApiService.get(url).then((response) => {
    var data: UserDescriptionAllApi[];
    data = response.data;
    var diaristas: UserShortInterface[] = [];
    data.map((dia: UserDescriptionAllApi) => {
      var diarista: UserShortInterface = {
        nome_completo: dia.first_name + " " + dia.last_name,
        cidade: dia.address.city,
        reputacao: getRandom(0, 5),
        foto_usuario:
          "https://loremflickr.com/300/300?lock=" + getRandom(0, 500),
      };
      diaristas.push(diarista);
    });
    console.log(diaristas.length);
    res.json({ diaristas: diaristas });
  });
  //   res.status(200).json(diaristas);
}

export default diaristasCidade;
