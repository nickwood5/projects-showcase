import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HTMLPage = () => {
  const { page } = useParams(); // Get the page name from URL
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/${page}.html`)
      .then((res) => res.text())
      .then((data) => setContent(data));
  }, [page]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HTMLPage;
