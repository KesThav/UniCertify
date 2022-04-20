import { padding } from "@mui/system";

const theme = {
    components: {
        MuiButton: {
          variants: [
            {
              props: { variant: 'contained' },
              style: {
                boxShadow: "none",
                fontSize: "1.2rem",
                paddingTop: "20px",
                paddingBottom: "20px",
                marginBottom: "5px",
                fontFamily : `"Roboto", "Helvetica", "Arial", sans-serif`,
                "&:hover": {
                  boxShadow:"none",
                }
              },
            },
            {
              props: { color: 'secondary' },
              style: {
                boxShadow: "none",
                backgroundColor: "#256e96",
                paddingTop: "20px",
                paddingBottom: "20px",
                "&:hover":{
                    backgroundColor: "#899966"
                }
              },
            },
          ],
        },
      },
}

export default theme;