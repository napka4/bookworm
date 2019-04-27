import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, List } from "semantic-ui-react";

const bookOnListModal = ({ lists, book, close, onAddBookOnList, isOpen, selectedList, setSelectedList }) => {
    const styles = {
        modalStyle: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        listStyle: {
            padding: '0.6em 0.1rem',
            backgroundColor: 'white',
        }
    };

    return (
        <div>
            <Modal
                size="mini"
                style={styles.modalStyle}
                open={isOpen}
                onClose={() => null}
            >
                <Modal.Header>Modifier le titre de la liste</Modal.Header>
                <Modal.Content>
                    {lists.map(list => 
                        <List key={list._id} divided verticalAlign='middle'>
                            <List.Item style={styles.listStyle}>
                                <List.Content floated='right'>
                                {(selectedList._id === list._id)?
                                    <Button 
                                        circular 
                                        color='green'
                                        icon='check' 
                                        onClick={() => setSelectedList(list) } />
                                :
                                    <Button 
                                        circular 
                                        icon='check' 
                                        onClick={() => setSelectedList(list) } />
                                }
                                </List.Content>
                                <List.Content style={{ fontSize: 18, marginTop: 8 }}>
                                    { list.title }
                                </List.Content>
                            </List.Item>
                        </List>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => close()} negative>
                        Annuler
                    </Button>
                    <Button
                        onClick={() => onAddBookOnList(book, true)}
                        positive
                        labelPosition="right"
                        icon="checkmark"
                        content="Ajouter" />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

bookOnListModal.propTypes = {
    lists: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    onAddBookOnList: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    selectedList: PropTypes.object.isRequired,
    setSelectedList: PropTypes.func.isRequired,
};

export default bookOnListModal;