const Home = () => {
	return (
		<div className="flex flex-col justify-between items-center h-screen">
			<h1 className="text-4xl text-gray-1600 my-8">Добро пожаловать!</h1>
			<div className="text-center">
				<p className="text-xl">Исследуйте просторы сайта и находите лучшее по самым низким ценам!</p>
			</div>
			<footer>
				<p className="text-gray-1600 my-8">© 2024 ИП Волкова. Все права защищены.</p>
			</footer>
		</div>
	);
};

export default Home;
