<?php
    //Fundamentals of Object Oriented Programming in PHP
    interface Animals {
        function animalType();
    }
    //implemented abstract and encapsulation
    abstract class Animal {
        public $name;
        private $age;

        function __construct($name, $age) {
            $this->name = $name;
            $this->age = $age;
        }

        function getAge() {
            return $this->age;
        }

        function setAge($age) {
            $this->age = $age;
        }

        abstract function make_sound();
    }

    //used polymorphism and inheritance
    class Lion extends Animal implements Animals{
        function animalType() {
            return "Lion";
        }

        function make_sound() {
            return "Roar";
        }
    }

    class Elephant extends Animal implements Animals {
        function animalType() {
            return "Elephant";
        }

        function make_sound() {
            return "Trumpet";
        }
    }

    class Dog extends Animal implements Animals{
        function animalType() {
            return "Dog";
        }

        function make_sound() {
            return "Bark";
        }
    }

    $lion = new Lion("Simba", 19);
    $elephant = new Elephant("Dumbo", 50);
    $dog = new Dog("Butchie", 4);

    $animals = [$lion, $elephant, $dog];

    foreach ($animals as $animal) {
        echo "\n{$animal->animalType()}: My name is {$animal->name}, {$animal->getAge()} years old, my sound is {$animal->make_sound()} ";
    }
?>