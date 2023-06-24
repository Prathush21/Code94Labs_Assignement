import NavigationBar from "./navigationbar";
import {
  Button,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css'

import Axios from "axios";

import { useState, useEffect } from "react";

export default function Recipies() {
  let navigate = useNavigate();

  const [recipesdata, setrecipesdata] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/viewallrecipes").then((response) => {
      setrecipesdata(...recipesdata, response.data);
    });
  }, []);

  function handleDeleteConfirmation(recipe) {
    setSelectedRecipe(recipe);
    setDeleteConfirmationOpen(true);
  }

  function handleCancelDelete() {
    setDeleteConfirmationOpen(false);
    setSelectedRecipe(null);
  }

  function handleDeleteRecipe() {
    Axios.post("http://localhost:3001/api/deleterecipe", {
      recipeid: selectedRecipe.id,
    })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {})
      .finally(() => {
        setDeleteConfirmationOpen(false);
        setSelectedRecipe(null);
      });
  }

  function addRecipieNavigation() {
    navigate("/addRecipe", { replace: true });
  }
  function editRecipieNavigation(data) {
    localStorage.setItem("recipedata", JSON.stringify(data));
    navigate("/editRecipe", { replace: true });
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <NavigationBar style={{ marginBottom: 12 }} />
      <br></br>
      <Grid container justify="space-around" paddingBottom={5} paddingTop={5}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={5}
          paddingLeft={15}
          paddingBottom={5}
          marginLeft={35}
        >
          <Button
            className="buttons2"
            type="submit"
            size="lg"
            variant="contained"
            sx={{ mt: 3, mb: 2, margin: 2 }}
            onClick={addRecipieNavigation}
          >
            Add new recipe
          </Button>
          <h1>Recipes </h1>
          <Button
            className="buttons2"
            type="submit"
            size="lg"
            variant="contained"
            sx={{ mt: 3, mb: 2, marginTop: 2 }}
            onClick={refreshPage}
          >
            Refresh Page
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table responsive aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Recipe Name</b>
                </TableCell>
                <TableCell>
                  <b>Description</b>
                </TableCell>
                <TableCell>
                  <b>Ingredients</b>
                </TableCell>
                <TableCell>
                  <b></b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipesdata.map((recipe) => (
                <TableRow
                  key={recipe.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{recipe.id}</TableCell>

                  <TableCell>{recipe.recipename}</TableCell>
                  <TableCell>{recipe.description}</TableCell>

                  <TableCell>{recipe.ingredients}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={5}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => editRecipieNavigation(recipe)}
                      >
                        <EditIcon />
                      </IconButton>

                      <Button
                        className="button6"
                        type="submit"
                        size="sm"
                        color="error"
                        onClick={() => handleDeleteConfirmation(recipe)}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Delete Recipes
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the recipe?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleDeleteRecipe} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
