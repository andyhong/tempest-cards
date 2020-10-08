import { Box, Text, CheckboxGroup, Checkbox } from '@chakra-ui/core'

const CategoryFilter = (props) => {

  function updateFilter(e) {
    props.onChange(e)
  }

  return (
    <Box
      px={6}
      py={6}
      display="flex"
      flexDirection="column"
      backgroundColor="white"
      borderRadius="1.5rem"
      backgroundColor="white"
      boxShadow="lg"
      overflow="hidden"
      my={6}
      mx={2}
      justifyContent="center"
    >
      <Text
        mb={1}
        textAlign="left"
        color="gray.500"
        fontWeight="500"
      >
        FILTER BY CATEGORY:
      </Text>
      <CheckboxGroup
        isInline
        spacing={6}
        variantColor="teal"
        defaultValue={[]}
        onChange={updateFilter}
      >
        {props.columns && props.columns.map(column => (
          <Checkbox
            key={column}
            value={column}
          >
            {props.categories[column]}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Box>

  )
}

export default CategoryFilter
