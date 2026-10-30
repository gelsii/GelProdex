import { Button } from "@/components/ui/button";
import React, { type SubmitEvent } from "react";
import axios from "axios";

const SignIn = () => {
  const [photo, setPhoto] = React.useState<any>();

  const handleSubmit = React.useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();

      async function fetcUpload() {
        const response = await axios({
          url: "http://localhost:8080/uploadFile",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: { file: photo[0] },
        });

        console.log(response.data);
      }
    },
    [photo],
  );

  return (
    <section className="w-full h-full">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="photo"
          onChange={(e) => setPhoto(e.target.files)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
};

export default SignIn;
