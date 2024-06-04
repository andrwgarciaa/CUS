import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SessionContext } from "../../../../contexts/SessionContext";
import { IProfil } from "../../interfaces";
import { getUserByName } from "../../utilities";
import PageNotFound from "../../../PageNotFound/PageNotFound";

const EditProfil = () => {
  const { name } = useParams();
  const session = useContext(SessionContext);
  const [user, setUser] = useState<IProfil | null>();

  const fetchUser = async () => {
    if (name) {
      const data = await getUserByName(name);
      setUser(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {session && session.user?.id === user?.id ? (
        <div>
          <h1>{user?.name}</h1>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default EditProfil;
