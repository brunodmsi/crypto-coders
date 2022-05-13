import React from 'react';

const Navbar = ({ account }) => {
	return (
		<nav className="flex flex-row items-center justify-between p-4 w-full h-14 bg-gray-400 text-white mb-6">
			<span>
				Crypto Coders
			</span>

			{!!account && <span>{account}</span>}	
		</nav>
	);
}

export default Navbar;