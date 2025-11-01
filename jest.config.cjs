module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "cjs"],
	clearMocks: true,
};
