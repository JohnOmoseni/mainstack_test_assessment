module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	clearMocks: true,
};
