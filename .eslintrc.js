module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	overrides: [],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', 'src/'],
			},
		},
		'import/extensions': 0,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'react/jsx-filename-extension': 'off',
		'import/extensions': 'off',
		'no-unused-vars': ['warn'],
		'arrow-body-style': 'off',
		'import/prefer-default-export': 'off',
		'react/no-array-index-key': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/function-component-definition': 'off',
		'react/require-default-props': 'off',
	},
}
