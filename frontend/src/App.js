import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ForcastChart from "./ForcastChart";
import Button from "@mui/material/Button";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

// the reducer to add up an array
const addAQReducer = (previousValue, currentValue) =>
    previousValue["CategoryValue"] + currentValue["CategoryValue"];

function WeatherInfoCard(props) {
    const title = props.title;
    const value = props.value;
    return (
        <Card className="mx-12 my-8 h-128">
            <CardContent className="flex content-between flex-col">
                <Typography variant="body1">{title}</Typography>
                <Typography variant="h4" component="div">
                    {value}
                </Typography>
                <Typography variant="body2">
                    Today's pollen level is low!
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function WeatherApp() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    // the incoming data, from weather API
    const [weatherData, setWeatherData] = useState(null);
    const [pollenAvg, setPollenAvg] = useState(0);
    const [pollenTotal, setPollenTotal] = useState(0);

    // the name of the city -- from user search input
    const [cityName, setCityName] = useState("");

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // open the profile menu
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    // Function for fetching data from forecasts api using location data from another endpoint

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // display the results
    function displayContent() {
        if (!weatherData) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <div className="w-2/3 m-48">
                        <h3 className="text-center">
                            Please select options from the menu above or the
                            category sidebar to find goods
                        </h3>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-row items-center px-6">
                    <div className="w-1/2 h-128">
                        <Typography
                            variant="h5"
                            component="div"
                            className="text-center pt-16 px-12"
                        >
                            {airQualityMessage}
                        </Typography>

                        <div>
                            <WeatherInfoCard
                                title={"Air Quality"}
                                value={
                                    weatherData["DailyForecasts"][0]
                                        .AirAndPollen[0]["Category"]
                                }
                            />
                            <WeatherInfoCard
                                title={"Pollen Levels"}
                                value={
                                    weatherData["DailyForecasts"][0]
                                        .AirAndPollen[1]["Category"]
                                }
                            />
                            <WeatherInfoCard
                                title={"UV Index"}
                                value={
                                    weatherData["DailyForecasts"][0]
                                        .AirAndPollen[5]["Category"]
                                }
                            />
                        </div>
                    </div>
                    <div className="w-1/2 h-128">
                        <ForcastChart />
                        <Typography
                            variant="h5"
                            component="div"
                            className="text-center px-12"
                        >
                            5-Day Allergy Forcast in{" "}
                            {cityName.replace(/./, (c) => c.toUpperCase())}
                        </Typography>
                    </div>
                </div>
            );
        }
    }

    const [airQualityMessage, setAirQualityMessage] = useState("");

    function generateAirQualityMessage(pollenIndex) {
        if (pollenIndex <= 3) {
            setAirQualityMessage(
                "Today's a great day. Go out and enjoy the fresh air!"
            );
        } else if (pollenIndex <= 6) {
            setAirQualityMessage(
                "Today's a decent day. Enjoy the outdoors but take precautions if you're sensitive."
            );
        } else if (pollenIndex <= 9) {
            setAirQualityMessage(
                "Today's a meh day. You might need to take some allergy medicine if you plan to be outside."
            );
        } else if (pollenIndex <= 12) {
            setAirQualityMessage(
                "Today might be a bad day to go outside. Take some medicine and try to stay indoors if you can."
            );
        } else if (pollenIndex <= 15) {
            setAirQualityMessage(
                "Today's an extremely bad day for pollen. Taek some medicine and stay indoors as much as possible."
            );
        } else if (pollenIndex <= 18) {
            setAirQualityMessage(
                "Uh oh! If you're reading this, it's too late. It's raining pollen. Head in to your bunker and stay put until further advisory if you want to live."
            );
        }
    }

    // submit the search form
    function handleSearchSubmit(event) {
        const forecastUrl = `http://localhost:8000/api/weather/${cityName}`;
        fetch(forecastUrl, {
            // posts the form to users/me/items. You need to login to be able to send this
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                let weatherInfo = JSON.parse(data["data"]["_content"]);
                setWeatherData(weatherInfo);

                let pollenData =
                    weatherInfo["DailyForecasts"][0]["AirAndPollen"];

                let pollenAverage = 0;
                let pollenSum = 0;
                for (var i = 1; i < pollenData.length; i++) {
                    if (i != 2) {
                        pollenSum += pollenData[i].CategoryValue;
                    }
                    pollenAverage = Math.round(pollenSum / 4);
                }
                setPollenAvg(pollenAverage);
                setPollenTotal(pollenSum);
                generateAirQualityMessage(pollenSum);
                console.log("weatherInfo::");
                console.log(weatherInfo);
            });
        event.preventDefault();
    }

    // handle search value change -- update the current state if needed
    function handleSearchChange(event) {
        setCityName(event.target.value);
    }

    return (
        <div>
            <Box className="flex-grow">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            Lucid Allergy Forecast
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <form onSubmit={handleSearchSubmit}>
                                <StyledInputBase
                                    placeholder="Search for a city here..."
                                    inputProps={{ "aria-label": "search" }}
                                    type="text"
                                    value={cityName}
                                    onChange={handleSearchChange}
                                />
                            </form>
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {renderMobileMenu}
            {renderMenu}
            {displayContent()}
        </div>
    );
}
