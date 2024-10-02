<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public $weatherController;
    
    public function __construct(){
        $this->weatherController = new WeatherController();
    }

    public function index(){
        $weather = $this->weatherController->getDailyWeather();
        return Inertia::render("Home", compact('weather'));
    }
}
