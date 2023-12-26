export default interface ProjectDto {
  id?: number
  name: string
  description: string
  imageUrl: string
  contractTypeId: number
  contractSignedOn: Date | string
  budget: number
  isActive: boolean
}
