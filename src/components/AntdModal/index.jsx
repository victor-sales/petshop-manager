import { Modal } from "antd";
import CustomFooter from "./CustomFooter";

export default function AntdModal({id, title, visible, setVisible, loading, render, message, setMessage, messageType, setMessageType, centered, ...props}) {
    return (
        <Modal
            key={id}
            onCancel={() => { setVisible(false); setMessage(""); setMessageType("") }}
            okText="Confirmar"
            cancelText="Fechar"
            title={title}
            open={visible}
            centered={centered}
            destroyOnClose={true}
            confirmLoading={loading}
            style={{top: 30}}
            maskClosable={false}
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