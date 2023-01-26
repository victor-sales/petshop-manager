import { Modal } from "antd";
import CustomFooter from "./CustomFooter";

export default function AntdModal({id, title, visible, setVisible, loading, render, message, setMessage, messageType, setMessageType, ...props}) {
    return (
        <Modal
            key={id}
            onCancel={() => { setVisible(false); setMessage(""); setMessageType("") }}
            okText="Confirmar"
            cancelText="Fechar"
            title={title}
            open={visible}
            destroyOnClose={true}
            confirmLoading={loading}
            style={{top: 30}}
            footer={[
                <CustomFooter 
                    key={"custom-footer"} 
                    message={message}
                    setMessage={setMessage}
                    messageType={messageType}
                    setMessageType={setMessageType}
                    loading={loading}
                />
            ]}
        >
            {props.children}
        </Modal>
    )
}