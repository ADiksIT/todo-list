export const handleDragEnd = ({destination, source, list}) => {
  const result = Array.from(list);
  const [removed] = result.splice(source.index, 1);

  result.splice(destination.index, 0, removed);

  return result;
}
