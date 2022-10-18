import Container from "../components/Container"
import Layout from "../components/Layout"
import { Table } from "antd"
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Racas (props) {
    const dataSource = [
        {
          id: '1',
          nome: 'SRD',
          especie: "Gato",
          descricao: 'Várias características possíveis',
        },
        {
          id: '2',
          nome: 'SRD',
          especie: 'Cachorro',
          descricao: 'Várias características possíveis',
        },
        {
          id: '3',
          nome: 'Pug',
          especie: 'Cachorro',
          descricao: 'Porte pequeno, pelo curto, focinho achatado',
        },
        {
          id: '4',
          nome: 'Pastor Alemão',
          especie: 'Cachorro',
          descricao: 'Porte grande, pleo médio em cores marrom e preto majoritariamente, com orelhas pontudas',
        },
        {
          id: '5',
          nome: 'Fila',
          especie: 'Cachorro',
          descricao: 'Porte grande, pelo curto, pele do rosto e orelhas caídas',
        },
        {
          id: '6',
          nome: 'Sphynx',
          especie: 'Gato',
          descricao: 'Gato pelado',
        },
        {
          id: '7',
          nome: 'Persa',
          especie: 'Gato',
          descricao: 'Pelagem longa, cara mais achatada, olhos mais juntos',
        },
        {
          id: '8',
          nome: 'Siames',
          especie: 'Gato',
          descricao: 'Pelagem curta, normalmente em cores pretas e cinzas. Cor preta predominante nas patas e cara',
        },
        {
          id: '9',
          nome: 'Ashera',
          especie: "Gato",
          descricao: 'Porte grande, pelagem curta, muito similar a um felino selvagem',
        },
      ];
      
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Nome',
          dataIndex: 'nome',
          key: 'nome',
        },
        {
          title: 'Especie',
          dataIndex: 'especie',
          key: 'especie',
        },
        {
          title: 'Descrição',
          dataIndex: 'descricao',
          key: 'descricao',
        },
        {
          title: 'Ações',
          key: 'actions',
          render: () => {
            return (
              <div className="flex flex-row gap-3">
                <button><FontAwesomeIcon className="h-4 w-4 text-blue-600" icon={faPencil}/></button>
                <button><FontAwesomeIcon className="h-4 w-4 text-red-600" icon={faTrash}/></button>
              </div>
            )
          }
        },
      ];
      
      
    return (
        <Layout>
            <Container>
              <div className="w-full flex flex-row-reverse">
              <button className="flex flex-col justify-center items-center text-blue-600 p-1 ">
                  <FontAwesomeIcon className="h-6 w-6" icon={faPlusCircle} />
                  <span className="text-sm">Nova Raça</span>
                </button>
              </div>
                
              <Table size="small" dataSource={dataSource} columns={columns}  />;
            </Container>
        </Layout>
    )
}   