import { Formik, Form, Field } from "formik";
import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";
interface SearchBarProps {
  onSubmit: (query: string) => void;
}
interface SearchFormValues {
  query: string;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (values: SearchFormValues): void => {
    const trimmedQuery = values.query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter a search term.");
      return;
    }

    onSubmit(trimmedQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <Field
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Searching movies..."
              autoFocus
            />

            <button className={styles.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
