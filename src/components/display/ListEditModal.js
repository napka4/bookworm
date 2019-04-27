import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Input } from "semantic-ui-react";

const ListEditModal = ({ list, onEditList, close, isOpen, title, setTitle }) => {
    const styles = {
        modalStyle: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }
    };

    return (
        <div>
            <Modal
                size="mini"
                style={ styles.modalStyle}
                open={isOpen}
                onClose={() => null}
            >
                <Modal.Header>Modifier le titre de la liste</Modal.Header>
                <Modal.Content>
                    <Input focus value={title} onChange={(e,data) => setTitle({editableTitle: data.value})}/>
                    <p>Etes-vous d'accord avec la modification?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => close()} negative>
                        Annuler
                    </Button>
                    <Button
                        onClick={() => onEditList(list, true)}
                        positive
                        labelPosition="right"
                        icon="checkmark"
                        content="Modifier" />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

ListEditModal.propTypes = {
  list: PropTypes.shape().isRequired,
  onEditList: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default ListEditModal;