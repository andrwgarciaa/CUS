import { useState } from "react";
import Modal from "../../../components/Modal";

const AddDirektoriKomunitasAktivitas = (props: any) => {
  const [direktori, setDirektori] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <p>Komunitas Aktivitas</p>
    </Modal>
  );
};

export default AddDirektoriKomunitasAktivitas;
