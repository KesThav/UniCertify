import { padding, textTransform } from "@mui/system"

const theme = {
    components: {
        MuiButton: {
          variants: [
            {
              props: { variant: 'contained' },
              style: {
                boxShadow: "none",
                fontSize: "1.2rem",
                marginBottom: "5px",
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                textTransform: "none",
                "&:hover": {
                  boxShadow:"none",
                }
              },
            },
            {
              props: { color: 'secondary',variant:"contained" },
              style: {
                boxShadow: "none",
                backgroundColor: "#256e96",
                paddingTop: "15px",
                paddingBottom: "15px",
                "&:hover":{
                    backgroundColor: "#899966"
                }
              },
            },
            {
              props: { color: 'primary' },
              style: {
                boxShadow: "none",
              },
            },
            {
              props: {variant: "text"},
              style:{
                fontSize: "1.2rem",
                textTransform: "none",
                marginRight: "10px"
              }
            },
            {
              props: {variant: "outlined", color: "inherit"},
              style:{
                border: '1px solide #11db11',
                textTransform: "none",
                marginTop: "3px",
                marginRight: "5px"
              }
            }
          ],

        },
        MuiCssBaseline: {
          styleOverrides: `
          @font-face {
            font-family: 'Comic Sans MS';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Comic Sans MS');
          }
          `,
        },
      },

}

export default theme;