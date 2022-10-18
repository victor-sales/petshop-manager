import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Especies(props) {
    const [visible, setVisible] = useState(false);
    const dataSource = [
        {
            id: "1",
            nome: "Cachorro",
            descricao: "Cachorro",
        },
        {
            id: "2",
            nome: "Gato",
            descricao: "Gato",
        },
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },

        {
          title: "Ações",
          key: "actions",
          render: () => {
              return (
                  <div className="flex flex-row gap-3">
                      <button onClick={(e) => setVisible(true)}>
                          <FontAwesomeIcon
                              className="h-4 w-4 text-blue-600"
                              icon={faPencil}
                          />
                      </button>
                      <button onClick={(e) => setVisible(true)}>
                          <FontAwesomeIcon
                              className="h-4 w-4 text-red-600"
                              icon={faTrash}
                          />
                      </button>
                  </div>
              );
          },
      },
    ];

    return (
        <Layout>
            <Container>
                <div className="w-full flex flex-row-reverse">
                    <IconButton iconName={faPlusCircle} title="Nova espécie" />
                </div>
                <Table size="small" dataSource={dataSource} columns={columns} />
            </Container>
            <Modal
                key={"new-breed"}
                onOk={() => setVisible(false)}
                title="Modal"
                open={visible}
            >
                Isso é um teste
            </Modal>
        </Layout>
    );
}
