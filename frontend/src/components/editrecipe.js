import { Box } from "@mui/system";
import { Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import NavigationBar from "./navigationbar";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css'

export default function EditRecipe() {
  let navigate = useNavigate();

  const [recipeData, setrecipedata] = useState(
    JSON.parse(localStorage.getItem("recipedata"))
  );

  const handleInputChange = (e) => {
    setrecipedata({ ...recipeData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    Axios.put("http://localhost:3001/api/editrecipe", {
      data: recipeData,
    }).then((response) => {});
    navigate("/", { replace: true });
  };
  return (
    <div>
      <NavigationBar  />

      <Box sx = {{marginTop:10}} component="form" Validate onSubmit={onSubmit}>
        <div className="full-form1">
          <h1 className="Heading"> Edit Recipe</h1>
          <div className="addform1">
            <Stack direction="row" alignItems="center" spacing={13}>
              <TextField
                className="text2"
                margin="normal"
                required
                value={recipeData.id}
                name="id"
                label="ID"
                id="id"
                onChange={(e) => handleInputChange(e)}
              />

              <TextField
                className="text2"
                margin="normal"
                required
                value={recipeData.recipename}
                name="recipename"
                label="Recipe name"
                id="recipename"
                onChange={(e) => handleInputChange(e)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={13}>
              <TextField
                className="text2"
                margin="normal"
                required
                value={recipeData.description}
                name="description"
                label="Description"
                id="description"
                onChange={(e) => handleInputChange(e)}
              />

              <TextField
                className="text2"
                margin="normal"
                required
                name="ingredients"
                value={recipeData.ingredients}
                label="Ingredients"
                onChange={(e) => handleInputChange(e)}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={10}
              marginLeft={20}
            >
              <Button
                className="buttons3"
                type="submit"
                size="lg"
                variant="contained"
                sx={{ mt: 3, mb: 2, margin: 2 }}
              >
                Update{" "}
              </Button>
              <Button
                className="buttons3"
                size="lg"
                color="error"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/", { replace: true })}
              >
                Cancel
              </Button>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}
